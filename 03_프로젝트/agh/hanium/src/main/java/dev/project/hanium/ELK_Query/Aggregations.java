package dev.project.hanium.ELK_Query;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Aggregations {
    private Avg_Cpu avg_cpu;
    private Avg_Mem avg_mem;
    private Avg_NetIn avg_net_in;
    private Avg_NetOut avg_net_out;

    private Max_Cpu max_cpu;
    private Max_Mem max_mem;
    private Max_NetIn max_net_in;
    private Max_NetOut max_net_out;

    // Getters and setters
}
