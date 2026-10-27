library ieee;
use ieee.std_logic_1164.all;

-- Primeira parte do seletor de prioridade, que seleciona
-- a moeda que pode ser usada para pagar o valor total Tot
entity sel_apto is
    port (tot : in  std_logic_vector(11 downto 0);
         c    : in  std_logic_vector(5 downto 0);  -- c(5)=c1 (1,00) ... c(0)=c6 (0,01)
         V100, V50, V25, V10, V5, V1 : out std_logic);
end sel_apto;

architecture estrutural of sel_apto is

    component comp12 is
        port (a, b           : in  std_logic_vector(11 downto 0);
            gout, eout, lout : out std_logic);
    end component;

    -- Lout de cada comparador: 1 quando Tot < moeda
    signal l100, l50, l25, l10, l5, l1 : std_logic;

begin

    -- Estágio 1: compara Tot (entrada A) com a constante BCD da moeda (entrada B)
    k100: comp12 port map (a => tot, b => "000100000000",   -- 100
                          gout => open, eout => open, lout => l100);

    k50:  comp12 port map (a => tot, b => "000001010000",   -- 050
                          gout => open, eout => open, lout => l50);

    k25:  comp12 port map (a => tot, b => "000000100101",   -- 025
                          gout => open, eout => open, lout => l25);

    k10:  comp12 port map (a => tot, b => "000000010000",   -- 010
                          gout => open, eout => open, lout => l10);

    k5:   comp12 port map (a => tot, b => "000000000101",   -- 005
                          gout => open, eout => open, lout => l5);

    k1:   comp12 port map (a => tot, b => "000000000001",   -- 001
                          gout => open, eout => open, lout => l1);

    -- Estágio 2: (Tot >= moeda) AND cofre com moeda
    -- Tot >= moeda equivale a NOT Lout
    V100 <= (not l100) and c(5);
    V50  <= (not l50)  and c(4);
    V25  <= (not l25)  and c(3);
    V10  <= (not l10)  and c(2);
    V5   <= (not l5)   and c(1);
    V1   <= (not l1)   and c(0);

end estrutural;