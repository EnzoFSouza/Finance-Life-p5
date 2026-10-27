library ieee;
use ieee.std_logic_1164.all;

entity comp_zero is
    port (tot      : in  std_logic_vector(11 downto 0);
         tot_eq_0 : out std_logic);
end comp_zero;

architecture estrutural of comp_zero is

    component comp12 is
        port (a, b             : in  std_logic_vector(11 downto 0);
            gout, eout, lout : out std_logic);
    end component;

begin

    c: comp12 port map (a => tot, b => "000000000000",
                       gout => open, eout => tot_eq_0, lout => open);

end estrutural;