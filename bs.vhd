library ieee;
use ieee.std_logic_1164.all;

entity bs is
   port (clk, reset : in  std_logic;
         btn_n      : in  std_logic;   -- botão ativo em nível baixo (KEY[3])
         t          : out std_logic);  -- pulso de um ciclo de clock
end bs;

architecture estrutural of bs is

   component ffd is
      port (ck, clr, set, d : in  std_logic;
                          q : out std_logic);
   end component;

   signal p  : std_logic;  -- botão apertado (nível alto)
   signal a  : std_logic;  -- p sincronizado com o clock
   signal b  : std_logic;  -- a atrasado de um ciclo
   signal bn : std_logic;  -- not b

begin

   p  <= not btn_n;
   bn <= not b;

   ffa: ffd port map (ck => clk, clr => reset, set => '1', d => p, q => a);
   ffb: ffd port map (ck => clk, clr => reset, set => '1', d => a, q => b);

   -- t = 1 só no ciclo em que a já subiu e b ainda não
   t <= a and bn;

end estrutural;