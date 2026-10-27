library ieee;
use ieee.std_logic_1164.all;

-- Somador de 4 bits
entity somador4bits is
    port (a, b : in  std_logic_vector(3 downto 0);
        cin  : in  std_logic;
        s    : out std_logic_vector(3 downto 0);
        cout : out std_logic);
end somador4bits;

architecture estrutural of somador4bits is

   component full_adder is
        port (a, b, cin : in  std_logic;
                s, cout : out std_logic);
    end component;

    signal c1, c2, c3 : std_logic;  -- transportes entre os bits

begin

    f0: full_adder port map (a => a(0), b => b(0), cin => cin, s => s(0), cout => c1);
    f1: full_adder port map (a => a(1), b => b(1), cin => c1,  s => s(1), cout => c2);
    f2: full_adder port map (a => a(2), b => b(2), cin => c2,  s => s(2), cout => c3);
    f3: full_adder port map (a => a(3), b => b(3), cin => c3,  s => s(3), cout => cout);

end estrutural;