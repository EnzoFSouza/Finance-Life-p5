library ieee;
use ieee.std_logic_1164.all;

entity maquina_troco is
   port (clk, reset : in  std_logic;
         key3       : in  std_logic;                      -- botão T, ativo em nível baixo
         v          : in  std_logic_vector(11 downto 0);  -- valor pedido (BCD)
         c          : in  std_logic_vector(5 downto 0);   -- c(5)=1,00 ... c(0)=0,01
         i          : out std_logic_vector(5 downto 0);   -- i(5)=1,00 ... i(0)=0,01
         l          : out std_logic);
end maquina_troco;

architecture estrutural of maquina_troco is

   component bs is
      port (clk, reset : in  std_logic;
            btn_n      : in  std_logic;
            t          : out std_logic);
   end component;

   component controlador is
      port (clk, reset : in  std_logic;
            t          : in  std_logic;
            tot_eq_0   : in  std_logic;
            en_sub     : in  std_logic;
            tot_ld     : out std_logic;
            tot_sel    : out std_logic;
            en_c       : out std_logic;
            l          : out std_logic);
   end component;

   component datapath is
      port (clk, reset : in  std_logic;
            v          : in  std_logic_vector(11 downto 0);
            c          : in  std_logic_vector(5 downto 0);
            tot_ld     : in  std_logic;
            tot_sel    : in  std_logic;
            en_c       : in  std_logic;
            i          : out std_logic_vector(5 downto 0);
            tot_eq_0   : out std_logic;
            en_sub     : out std_logic);
   end component;

   signal t        : std_logic;
   signal tot_eq_0 : std_logic;
   signal en_sub   : std_logic;
   signal tot_ld   : std_logic;
   signal tot_sel  : std_logic;
   signal en_c     : std_logic;

begin

   botao: bs port map (clk => clk, reset => reset, btn_n => key3, t => t);

   ctrl: controlador port map (clk => clk, reset => reset, t => t,
                               tot_eq_0 => tot_eq_0, en_sub => en_sub,
                               tot_ld => tot_ld, tot_sel => tot_sel,
                               en_c => en_c, l => l);

   dp: datapath port map (clk => clk, reset => reset, v => v, c => c,
                          tot_ld => tot_ld, tot_sel => tot_sel, en_c => en_c,
                          i => i, tot_eq_0 => tot_eq_0, en_sub => en_sub);

end estrutural;