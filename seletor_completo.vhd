library ieee;
use ieee.std_logic_1164.all;

-- Seletor de prioridade completo
entity seletor is
    port (tot    : in  std_logic_vector(11 downto 0);
         c      : in  std_logic_vector(5 downto 0);
         en_sub : out std_logic;
         sel_i  : out std_logic_vector(5 downto 0);
         sub    : out std_logic_vector(11 downto 0));
end seletor;

architecture estrutural of seletor is

    component sel_apto is
        port (tot : in  std_logic_vector(11 downto 0);
            c   : in  std_logic_vector(5 downto 0);
            V100, V50, V25, V10, V5, V1 : out std_logic);
    end component;

    component sel_prior is
        port (V100, V50, V25, V10, V5, V1 : in  std_logic;
            en_sub : out std_logic;
            sel_i  : out std_logic_vector(5 downto 0);
            sub    : out std_logic_vector(11 downto 0));
    end component;

    signal V100, V50, V25, V10, V5, V1 : std_logic;

begin

    apto: sel_apto port map (tot => tot, c => c,
                            V100 => V100, V50 => V50, V25 => V25,
                            V10 => V10, V5 => V5, V1 => V1);

    prioridade: sel_prior port map (V100 => V100, V50 => V50, V25 => V25,
                              V10 => V10, V5 => V5, V1 => V1,
                              en_sub => en_sub, sel_i => sel_i, sub => sub);

end estrutural;