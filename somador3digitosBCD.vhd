library ieee;
use ieee.std_logic_1164.all;

-- Somador de 3 dígitos BCD
entity bcd_add3 is
    port (a, b : in  std_logic_vector(11 downto 0);
         cin  : in  std_logic;
         z    : out std_logic_vector(11 downto 0); -- Resultado corrigido
         cout : out std_logic);
end bcd_add3;

architecture estrutural of bcd_add3 is

    component bcd_dig is
        port (a, b : in  std_logic_vector(3 downto 0);
            cin  : in  std_logic;
            z    : out std_logic_vector(3 downto 0);
            cout : out std_logic);
    end component;

    signal carry_u, carry_d : std_logic;  -- transporte unidades --> dezenas e dezenas --> centenas

begin

    unid: bcd_dig port map (a => a(3 downto 0),  b => b(3 downto 0),  cin => cin,
                           z => z(3 downto 0),  cout => carry_u);

    dez:  bcd_dig port map (a => a(7 downto 4),  b => b(7 downto 4),  cin => carry_u,
                           z => z(7 downto 4),  cout => carry_d);

    cent: bcd_dig port map (a => a(11 downto 8), b => b(11 downto 8), cin => carry_d,
                           z => z(11 downto 8), cout => cout);

end estrutural;