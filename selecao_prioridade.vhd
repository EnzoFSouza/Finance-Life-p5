library ieee;
use ieee.std_logic_1164.all;

-- Segunda parte do seletor de prioridade, que verifica
-- quais moedas podem ser entregues e seleciona a maior disponível.
entity sel_prior is
    port (V100, V50, V25, V10, V5, V1 : in  std_logic;
         en_sub : out std_logic;
         sel_i  : out std_logic_vector(5 downto 0);   -- bit 5 = 1,00 ... bit 0 = 0,01
         sub    : out std_logic_vector(11 downto 0)); -- valor BCD da moeda escolhida
end sel_prior;

architecture estrutural of sel_prior is

    component mux2x1_12 is
        port (sel : in  std_logic;
            d0  : in  std_logic_vector(11 downto 0);
            d1  : in  std_logic_vector(11 downto 0);
            y   : out std_logic_vector(11 downto 0));
    end component;

    -- Estágio 3: ativação (no máximo um vale 1)
    signal A100, A50, A25, A10, A5, A1 : std_logic;

    -- Saídas intermediárias da cadeia de muxes
    signal m1, m2, m3, m4, m5 : std_logic_vector(11 downto 0);

begin

    -- Estágio 3: en_sub vale 1 se qualquer moeda puder ser entregue
    en_sub <= V100 or V50 or V25 or V10 or V5 or V1;

    -- Estágio 4: uma moeda só é ativada se todas as maiores estiverem inaptas
    A100 <= V100;
    A50  <= V50 and (not V100);
    A25  <= V25 and (not (V100 or V50));
    A10  <= V10 and (not (V100 or V50 or V25));
    A5   <= V5  and (not (V100 or V50 or V25 or V10));
    A1   <= V1  and (not (V100 or V50 or V25 or V10 or V5));

    -- sel_i, na ordem dos cofres (1,00 no bit 5, 0,01 no bit 0)
    sel_i(5) <= A100;
    sel_i(4) <= A50;
    sel_i(3) <= A25;
    sel_i(2) <= A10;
    sel_i(1) <= A5;
    sel_i(0) <= A1;

    -- Estágio 5: Sub, cadeia de 6 muxes (Figura 3.8, da direita para a esquerda do desenho)
    mx1: mux2x1_12 port map (sel => A1,   d0 => "000000000000", d1 => "000000000001", y => m1);
    mx2: mux2x1_12 port map (sel => A5,   d0 => m1,             d1 => "000000000101", y => m2);
    mx3: mux2x1_12 port map (sel => A10,  d0 => m2,             d1 => "000000010000", y => m3);
    mx4: mux2x1_12 port map (sel => A25,  d0 => m3,             d1 => "000000100101", y => m4);
    mx5: mux2x1_12 port map (sel => A50,  d0 => m4,             d1 => "000001010000", y => m5);
    mx6: mux2x1_12 port map (sel => A100, d0 => m5,             d1 => "000100000000", y => sub);

end estrutural;