library ieee;
use ieee.std_logic_1164.all;

-- Datapath completo do sistema de cofres
entity datapath is
    port (clk, reset : in  std_logic;
         v          : in  std_logic_vector(11 downto 0);  -- valor pedido (BCD)
         c          : in  std_logic_vector(5 downto 0);   -- cofres: c(5)=1,00 ... c(0)=0,01
         tot_ld     : in  std_logic;                      -- da FSM: habilita escrita em Tot
         tot_sel    : in  std_logic;                      -- da FSM: 0 = V, 1 = Tot - Sub
         en_c       : in  std_logic;                      -- da FSM: habilita as saídas i
         i          : out std_logic_vector(5 downto 0);   -- aciona os cofres
         tot_eq_0   : out std_logic;                      -- para a FSM: Tot = 0
         en_sub     : out std_logic);                     -- para a FSM: existe moeda apta
end datapath;

architecture estrutural of datapath is

    component mux2x1_12 is
        port (sel : in  std_logic;
            d0  : in  std_logic_vector(11 downto 0);
            d1  : in  std_logic_vector(11 downto 0);
            y   : out std_logic_vector(11 downto 0));
    end component;

    component reg12 is
        port (ck, clr, ld : in  std_logic;
            din         : in  std_logic_vector(11 downto 0);
            q           : out std_logic_vector(11 downto 0));
    end component;

    component comp_zero is
        port (tot      : in  std_logic_vector(11 downto 0);
            tot_eq_0 : out std_logic);
    end component;

    component seletor is
        port (tot    : in  std_logic_vector(11 downto 0);
            c      : in  std_logic_vector(5 downto 0);
            en_sub : out std_logic;
            sel_i  : out std_logic_vector(5 downto 0);
            sub    : out std_logic_vector(11 downto 0));
    end component;

    component bcd_sub is
          port (a, b : in  std_logic_vector(11 downto 0);
            z    : out std_logic_vector(11 downto 0));
    end component;

    signal tot       : std_logic_vector(11 downto 0);  -- saída do registrador
    signal mux_out   : std_logic_vector(11 downto 0);  -- entrada do registrador
    signal tot_menos : std_logic_vector(11 downto 0);  -- Tot - Sub
    signal sub       : std_logic_vector(11 downto 0);  -- moeda escolhida (BCD)
    signal sel_i     : std_logic_vector(5 downto 0);   -- cofre escolhido, apenas um bit é 1

begin

    -- Mux: porta 0 = V, porta 1 = Tot - Sub
    mux: mux2x1_12 port map (sel => tot_sel, d0 => v, d1 => tot_menos, y => mux_out);

    -- Registrador Tot
    regTot: reg12 port map (ck => clk, clr => reset, ld => tot_ld, din => mux_out, q => tot);

    -- Comparador = 0
    compz: comp_zero port map (tot => tot, tot_eq_0 => tot_eq_0);

    -- Seletor de prioridade
    selprior: seletor port map (tot => tot, c => c, en_sub => en_sub, sel_i => sel_i, sub => sub);

    -- Subtrator BCD: Tot - Sub
    subtrator: bcd_sub port map (a => tot, b => sub, z => tot_menos);

    -- AND para indicar que cofre só é acionado se foi escolhido E autorizado pela FSM
    i(5) <= sel_i(5) and en_c;
    i(4) <= sel_i(4) and en_c;
    i(3) <= sel_i(3) and en_c;
    i(2) <= sel_i(2) and en_c;
    i(1) <= sel_i(1) and en_c;
    i(0) <= sel_i(0) and en_c;

end estrutural;