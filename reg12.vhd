library ieee;
use ieee.std_logic_1164.all;

-- Registrador de Tot com 12 bits
entity reg12 is
    port (ck, clr, ld : in  std_logic;
            din         : in  std_logic_vector(11 downto 0);  -- Saída do mux (V ou Tot - Sub)
            q           : out std_logic_vector(11 downto 0)); -- Tot
end reg12;

architecture estrutural of reg12 is

    component ffd is
        port (ck, clr, set, d : in  std_logic;
                            q : out std_logic);
    end component;

    signal d_ff  : std_logic_vector(11 downto 0);  -- entrada D de cada flip-flop
    signal q_int : std_logic_vector(11 downto 0);  -- saída dos flip-flops (lida internamente)

begin
    
    -- Controle de carga: d = (ld AND din) OR (NOT ld AND q)
    -- ld = 1 --> d recebe din (grava din)
    -- ld = 0 --> d recebe q (realimenta o próprio valor, mantém)

    d_ff(0)  <= (ld and din(0))  or ((not ld) and q_int(0));
    d_ff(1)  <= (ld and din(1))  or ((not ld) and q_int(1));
    d_ff(2)  <= (ld and din(2))  or ((not ld) and q_int(2));
    d_ff(3)  <= (ld and din(3))  or ((not ld) and q_int(3));
    d_ff(4)  <= (ld and din(4))  or ((not ld) and q_int(4));
    d_ff(5)  <= (ld and din(5))  or ((not ld) and q_int(5));
    d_ff(6)  <= (ld and din(6))  or ((not ld) and q_int(6));
    d_ff(7)  <= (ld and din(7))  or ((not ld) and q_int(7));
    d_ff(8)  <= (ld and din(8))  or ((not ld) and q_int(8));
    d_ff(9)  <= (ld and din(9))  or ((not ld) and q_int(9));
    d_ff(10) <= (ld and din(10)) or ((not ld) and q_int(10));
    d_ff(11) <= (ld and din(11)) or ((not ld) and q_int(11));

    -- 12 flip-flops D (set desativado em '1', clr ligado ao reset)
    ff0:  ffd port map (ck => ck, clr => clr, set => '1', d => d_ff(0),  q => q_int(0));
    ff1:  ffd port map (ck => ck, clr => clr, set => '1', d => d_ff(1),  q => q_int(1));
    ff2:  ffd port map (ck => ck, clr => clr, set => '1', d => d_ff(2),  q => q_int(2));
    ff3:  ffd port map (ck => ck, clr => clr, set => '1', d => d_ff(3),  q => q_int(3));
    ff4:  ffd port map (ck => ck, clr => clr, set => '1', d => d_ff(4),  q => q_int(4));
    ff5:  ffd port map (ck => ck, clr => clr, set => '1', d => d_ff(5),  q => q_int(5));
    ff6:  ffd port map (ck => ck, clr => clr, set => '1', d => d_ff(6),  q => q_int(6));
    ff7:  ffd port map (ck => ck, clr => clr, set => '1', d => d_ff(7),  q => q_int(7));
    ff8:  ffd port map (ck => ck, clr => clr, set => '1', d => d_ff(8),  q => q_int(8));
    ff9:  ffd port map (ck => ck, clr => clr, set => '1', d => d_ff(9),  q => q_int(9));
    ff10: ffd port map (ck => ck, clr => clr, set => '1', d => d_ff(10), q => q_int(10));
    ff11: ffd port map (ck => ck, clr => clr, set => '1', d => d_ff(11), q => q_int(11));

    q <= q_int;

end estrutural;