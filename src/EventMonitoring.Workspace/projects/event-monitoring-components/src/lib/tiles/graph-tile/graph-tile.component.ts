import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from '../../dashboard/tile/tile.component';
import { TileAction } from '../../dashboard/tile-header/tile-header.component';
import { DesignTokens } from '../../tokens/design-tokens';

export interface GraphDataPoint {
  timestamp: string | number;
  value: number;
}

export interface GraphSeries {
  label: string;
  data: GraphDataPoint[];
  color?: string;
}

export type GraphType = 'line' | 'bar' | 'area';

@Component({
  selector: 'em-graph-tile',
  standalone: true,
  imports: [CommonModule, TileComponent],
  templateUrl: './graph-tile.component.html',
  styleUrls: ['./graph-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphTileComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() title = '';
  @Input() icon = 'show_chart';
  @Input() series: GraphSeries[] = [];
  @Input() graphType: GraphType = 'line';
  @Input() editMode = false;
  @Input() yAxisMin?: number;
  @Input() yAxisMax?: number;
  @Input() showLegend = false;
  @Input() actions: TileAction[] = [
    { id: 'folder', icon: 'folder_open' },
    { id: 'fullscreen', icon: 'fullscreen' },
    { id: 'more', icon: 'more_vert' },
  ];

  @Output() actionClick = new EventEmitter<string>();

  private chart: unknown = null;
  private chartJsLoaded = false;

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['series'] || changes['graphType']) && this.chart) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private async initChart(): Promise<void> {
    try {
      const ChartModule = await import('chart.js');
      const { Chart, registerables } = ChartModule;
      Chart.register(...registerables);
      this.chartJsLoaded = true;
      this.createChart(Chart);
    } catch {
      this.chartJsLoaded = false;
    }
  }

  private createChart(Chart: typeof import('chart.js').Chart): void {
    if (!this.chartCanvas?.nativeElement) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const datasets = this.series.map((s, index) => ({
      label: s.label,
      data: s.data.map((d) => d.value),
      borderColor: s.color || this.getDefaultColor(index),
      backgroundColor: this.getBackgroundColor(s.color || this.getDefaultColor(index)),
      fill: this.graphType === 'area',
      tension: 0.4,
    }));

    const labels = this.series[0]?.data.map((d) => String(d.timestamp)) || [];

    this.chart = new Chart(ctx, {
      type: this.graphType === 'area' ? 'line' : this.graphType,
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: this.showLegend,
            labels: {
              color: 'rgba(255, 255, 255, 0.87)',
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.6)',
            },
          },
          y: {
            min: this.yAxisMin,
            max: this.yAxisMax,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.6)',
            },
          },
        },
      },
    });
  }

  private updateChart(): void {
    if (!this.chart || !this.chartJsLoaded) return;

    const chartInstance = this.chart as {
      data: {
        labels: string[];
        datasets: Array<{
          label: string;
          data: number[];
          borderColor: string;
          backgroundColor: string;
          fill: boolean;
        }>;
      };
      update: () => void;
    };

    chartInstance.data.labels = this.series[0]?.data.map((d) => String(d.timestamp)) || [];
    chartInstance.data.datasets = this.series.map((s, index) => ({
      label: s.label,
      data: s.data.map((d) => d.value),
      borderColor: s.color || this.getDefaultColor(index),
      backgroundColor: this.getBackgroundColor(s.color || this.getDefaultColor(index)),
      fill: this.graphType === 'area',
    }));
    chartInstance.update();
  }

  private destroyChart(): void {
    if (this.chart && this.chartJsLoaded) {
      const chartInstance = this.chart as { destroy: () => void };
      chartInstance.destroy();
      this.chart = null;
    }
  }

  private getDefaultColor(index: number): string {
    const colors = [
      DesignTokens.colors.primary,
      DesignTokens.colors.secondary,
      DesignTokens.colors.error,
      '#64b5f6',
      '#ffb74d',
      '#81c784',
    ];
    return colors[index % colors.length];
  }

  private getBackgroundColor(color: string): string {
    // Add 20% opacity for fill
    return color + '33';
  }

  onActionClick(actionId: string): void {
    this.actionClick.emit(actionId);
  }
}
