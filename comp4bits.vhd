library ieee;
use ieee.std_logic_1164.all;

-- Comparador de 4 bitS
entity comp4 is
    port (a, b             : in  std_logic_vector(3 downto 0);
         gin, ein, lin    : in  std_logic;
         gout, eout, lout : out std_logic);
end comp4;

architecture estrutural of comp4 is

    component comp1 is
        port (a, b, gin, ein, lin : in  std_logic;
            gout, eout, lout    : out std_logic);
    end component;

    -- fios entre um bloco e o seguinte
    signal g0, e0, l0 : std_logic;
    signal g1, e1, l1 : std_logic;
    signal g2, e2, l2 : std_logic;

begin

    c0: comp1 port map (a => a(0), b => b(0), gin => gin, ein => ein, lin => lin,
                       gout => g0, eout => e0, lout => l0);

    c1: comp1 port map (a => a(1), b => b(1), gin => g0, ein => e0, lin => l0,
                       gout => g1, eout => e1, lout => l1);

    c2: comp1 port map (a => a(2), b => b(2), gin => g1, ein => e1, lin => l1,
                       gout => g2, eout => e2, lout => l2);

    c3: comp1 port map (a => a(3), b => b(3), gin => g2, ein => e2, lin => l2,
                       gout => gout, eout => eout, lout => lout);

end estrutural;