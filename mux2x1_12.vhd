library ieee;
use ieee.std_logic_1164.all;

-- Multiplexador 2x1 de 12 bits
entity mux2x1_12 is
   port (sel : in  std_logic;
         d0  : in  std_logic_vector(11 downto 0);  -- V na porta 0
         d1  : in  std_logic_vector(11 downto 0);  -- Tot - Sub na porta 1
         y   : out std_logic_vector(11 downto 0));
end mux2x1_12;

architecture logica of mux2x1_12 is
begin
   with sel select
      y <= d0 when '0',
           d1 when others;
end logica;