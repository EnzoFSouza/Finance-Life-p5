library ieee;
use ieee.std_logic_1164.all;

entity controlador is
    port (clk, reset : in  std_logic;
         t          : in  std_logic;   -- pulso do botão sincronizado
         tot_eq_0   : in  std_logic;   -- do datapath (Z)
         en_sub     : in  std_logic;   -- do datapath (E)
         tot_ld     : out std_logic;
         tot_sel    : out std_logic;
         en_c       : out std_logic;
         l          : out std_logic);
end controlador;

architecture estrutural of controlador is

    component ffd is
        port (ck, clr, set, d : in  std_logic;
                          q : out std_logic);
    end component;

    signal s1, s0       : std_logic;   -- estado atual
    signal s1_nx, s0_nx : std_logic;   -- próximo estado (s1+ e s0+)
    signal s1n, s0n     : std_logic;   -- s1' e s0'
    signal tn, zn       : std_logic;   -- T' e Z'
    signal f            : std_logic;   -- F = NOR(Z, E)

begin

    -- Complementos
    s1n <= not s1;
    s0n <= not s0;
    tn  <= not t;
    zn  <= not tot_eq_0;

    -- Z = Tot_eq_0 e E = en_sub
    -- F = (Z + E)'
    f <= not (tot_eq_0 or en_sub);

    -- Próximo estado
    s1_nx <= (s1n and s0 and zn) or (s1 and s0 and tn);
    s0_nx <= s1 or (s0n and t) or (s0 and f);

    -- Saídas
    tot_ld  <= (s1 and s0n) or (s1 and t) or (s0n and t);
    en_c    <= s1 and s0n;
    tot_sel <= s1 and s0n;
    l       <= ((s1 xor s0) and clk) or (s1 and s0);

    -- Registrador de estado: 2 flip-flops D
    -- set desativado ('1'), clr ligado ao reset (ambos ativos em nível baixo)
    ff1: ffd port map (ck => clk, clr => reset, set => '1', d => s1_nx, q => s1);
    ff0: ffd port map (ck => clk, clr => reset, set => '1', d => s0_nx, q => s0);

end estrutural;