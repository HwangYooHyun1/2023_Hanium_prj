package dev.project.hanium.ELK_Query;

import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class AggregationsMax {


    private Max_Cpu max_cpu;
    private Max_Mem max_mem;
    private Max_NetIn max_net_in;
    private Max_NetOut max_net_out;
}
