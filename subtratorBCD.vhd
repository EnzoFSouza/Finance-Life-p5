library ieee;
use ieee.std_logic_1164.all;

entity bcd_sub is
    port (a, b : in  std_logic_vector(11 downto 0);
            z  : out std_logic_vector(11 downto 0));
end bcd_sub;

architecture estrutural of bcd_sub is

    component comp9 is
        port (d : in  std_logic_vector(3 downto 0);
              y : out std_logic_vector(3 downto 0));
    end component;

    component bcd_add3 is
        port (a, b : in  std_logic_vector(11 downto 0);
            cin  : in  std_logic;
            z    : out std_logic_vector(11 downto 0);
            cout : out std_logic);
    end component;

    signal compl_b : std_logic_vector(11 downto 0);  -- 999 - B
    signal r1 : std_logic_vector(11 downto 0);  -- A + (999 - B)
    signal c1 : std_logic;                      -- transporte do 1º somador (não usado)
    signal c2 : std_logic;                      -- transporte do 2º somador (descartado)

begin

    -- complemento de 9 em cada dígito de B
    nova_cent: comp9 port map (d => b(11 downto 8), y => compl_b(11 downto 8));
    nova_dez:  comp9 port map (d => b(7 downto 4),  y => compl_b(7 downto 4));
    nova_unid: comp9 port map (d => b(3 downto 0),  y => compl_b(3 downto 0));
    
    -- 1º somador: A + (999 - B), com cin = 0
    som1: bcd_add3 port map (a => a, b => compl_b, cin => '0', z => r1, cout => c1);

    -- 2º somador: soma a constante 1 ao resultado
    som2: bcd_add3 port map (a => "000000000001", b => r1, cin => '0', z => z, cout => c2);

end estrutural;