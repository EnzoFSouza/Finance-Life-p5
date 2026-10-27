library ieee;
use ieee.std_logic_1164.all;

-- Somador de 1 dígito BCD
entity bcd_dig is
    port (a, b : in  std_logic_vector(3 downto 0);
            cin  : in  std_logic;
            z    : out std_logic_vector(3 downto 0); -- Resultador corrigido
            cout : out std_logic);
end bcd_dig;

architecture estrutural of bcd_dig is

    component somador4bits is
        port (a, b : in  std_logic_vector(3 downto 0);
            cin  : in  std_logic;
            s    : out std_logic_vector(3 downto 0);
            cout : out std_logic);
    end component;

    signal s_raw : std_logic_vector(3 downto 0);  -- Soma binária pura
    signal c4    : std_logic;                     -- Transporte da soma binária
    signal corr  : std_logic;                     -- 1 quando precisa somar 6
    signal seis  : std_logic_vector(3 downto 0);  -- 0110 ou 0000

begin

    -- soma binária de a + b + cin
    soma: somador4bits port map (a => a, b => b, cin => cin, s => s_raw, cout => c4);

    -- se resultado > 9: passou de 15 (c4) ou está entre 10 e 15 (s3 e s2, ou s3 e s1)
    corr <= c4 or (s_raw(3) and s_raw(2)) or (s_raw(3) and s_raw(1));

    -- constante de correção: 0110 se corr = 1, 0000 se corr = 0
    seis <= '0' & corr & corr & '0';

    -- soma o corretor
    ajuste: somador4bits port map (a => s_raw, b => seis, cin => '0', s => z, cout => open);

    cout <= corr;

end estrutural;