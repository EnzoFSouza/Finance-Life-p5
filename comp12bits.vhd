library ieee;
use ieee.std_logic_1164.all;

-- Comparador de 12 bits
entity comp12 is
    port (a, b             : in  std_logic_vector(11 downto 0);
        gout, eout, lout : out std_logic);  -- A>B, A=B, A<B
end comp12;

architecture estrutural of comp12 is

    component comp4 is
        port (a, b             : in  std_logic_vector(3 downto 0);
            gin, ein, lin    : in  std_logic;
            gout, eout, lout : out std_logic);
    end component;

    signal g0, e0, l0 : std_logic;  -- saída do bloco [3:0]
    signal g1, e1, l1 : std_logic;  -- saída do bloco [7:4]

begin

    c0: comp4 port map (a => a(3 downto 0), b => b(3 downto 0),
                       gin => '0', ein => '1', lin => '0',
                       gout => g0, eout => e0, lout => l0);

    c1: comp4 port map (a => a(7 downto 4), b => b(7 downto 4),
                       gin => g0, ein => e0, lin => l0,
                       gout => g1, eout => e1, lout => l1);

    c2: comp4 port map (a => a(11 downto 8), b => b(11 downto 8),
                       gin => g1, ein => e1, lin => l1,
                       gout => gout, eout => eout, lout => lout);

end estrutural;