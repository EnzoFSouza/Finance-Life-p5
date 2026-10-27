library ieee;
use ieee.std_logic_1164.all;

entity comp9 is
    port (d : in  std_logic_vector(3 downto 0); -- dígito BCD (0 a 9)
         y : out std_logic_vector(3 downto 0));  -- 9 - d
end comp9;

architecture logica of comp9 is
begin
    y(0) <= not d(0);
    y(1) <= d(1);
    y(2) <= d(2) xor d(1);
    y(3) <= not (d(3) or d(2) or d(1));
end logica;