library ieee;
use ieee.std_logic_1164.all;

entity topo is
   port (clk27 : in  std_logic;                      -- CLOCK_27
         reset : in  std_logic;                      -- KEY[0]
         key3  : in  std_logic;                      -- KEY[3]
         v     : in  std_logic_vector(11 downto 0);
         c     : in  std_logic_vector(5 downto 0);
         i     : out std_logic_vector(5 downto 0);
         l     : out std_logic);                     -- LEDG[0]
end topo;

architecture estrutural of topo is

   component ck_div is
      port (ck_in  : in  std_logic;
            ck_out : out std_logic);
   end component;

   component maquina_troco is
      port (clk, reset : in  std_logic;
            key3       : in  std_logic;
            v          : in  std_logic_vector(11 downto 0);
            c          : in  std_logic_vector(5 downto 0);
            i          : out std_logic_vector(5 downto 0);
            l          : out std_logic);
   end component;

   signal clk1hz : std_logic;

begin

   div:  ck_div port map (ck_in => clk27, ck_out => clk1hz);

   core: maquina_troco port map (clk => clk1hz, reset => reset, key3 => key3,
                                 v => v, c => c, i => i, l => l);

end estrutural;