library ieee;
use ieee.std_logic_1164.all;

-- Comparador de 1 bit
entity comp1 is
   port (a, b, gin, ein, lin : in  std_logic;
            gout, eout, lout : out std_logic);
end comp1;

architecture logica of comp1 is
begin
    -- Gout = A · B' + (A ⊙ B) · Gin,
    -- Eout = (A ⊙ B) · Ein,
    -- Lout = A' · B + (A ⊙ B) · Lin

    gout <= (a and (not b)) or ((not (a xor b)) and gin);
    eout <= (not (a xor b)) and ein;
    lout <= ((not a) and b) or ((not (a xor b)) and lin);

end logica;