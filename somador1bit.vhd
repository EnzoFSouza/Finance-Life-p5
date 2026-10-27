library ieee;
use ieee.std_logic_1164.all;

-- Somador de 1 bit
entity full_adder is
    port (a, b, cin : in  std_logic;
            s, cout : out std_logic);
end full_adder;

architecture logica of full_adder is
begin
    s <= a xor b xor cin;
    cout <= (a and b) or (cin and (a xor b));
end logica;