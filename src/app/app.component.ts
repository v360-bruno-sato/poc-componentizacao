import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  custom = {
    "style": "flex-grow: 1; padding: 15px",
    "componentes": {
      "customTable": {
        "style": "width: 1000px;"
      },
      "barChart": {}
    }
  };
  viewConstructor = new FormControl(JSON.stringify(this.custom, undefined, 4));
  @ViewChild('body', {read: ViewContainerRef}) body: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  style;

  ngOnInit() {
  }

  ngAfterViewInit() {
    const viewConstructorJson = JSON.parse(this.viewConstructor.value);
    this.createVisualization(viewConstructorJson['componentes']);
    this.style = viewConstructorJson['style'];
  }
  
  checkComponent(key: string, components: any[]) {
    switch(key) {
      case 'customTable':
        const customTableFactory = this.componentFactoryResolver.resolveComponentFactory(CustomTableComponent);
        const customTable = this.body.createComponent<CustomTableComponent>(customTableFactory);
        customTable.instance.style = components[key].style;
        break;
      case 'barChart':
        const barChartFactory = this.componentFactoryResolver.resolveComponentFactory(LineChartComponent);
        const customLineChart = this.body.createComponent<LineChartComponent>(barChartFactory);
        break;
      case 'pieChart':
        const pieChartFactory = this.componentFactoryResolver.resolveComponentFactory(PieChartComponent);
        const customPieChart = this.body.createComponent<PieChartComponent>(pieChartFactory);
        break;
    }
  }

  createVisualization(components: any[]) {
    for (const key in components) {
      this.checkComponent(key, components);
    }
  }

  atualizarVizualizacao() {
    this.body.clear();
    if (this.viewConstructor.value != null) {
      const viewConstructorJson = JSON.parse(this.viewConstructor.value);
      this.style = viewConstructorJson['style'];
      this.createVisualization(viewConstructorJson['componentes']);
    }
  }
}
