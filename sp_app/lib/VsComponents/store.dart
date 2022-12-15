import 'package:flutter/material.dart';
import 'package:charts_flutter/flutter.dart' as charts;

/// Sample ordinal data type.
class OrdinalSales {
  final String year;
  final int sales;

  OrdinalSales(this.year, this.sales);
}

List<charts.Series<OrdinalSales, String>> BarChartData_demo() {
  final data = [
    OrdinalSales('2014', 5),
    OrdinalSales('2015', 25),
    OrdinalSales('2016', 100),
    OrdinalSales('2017', 75),
  ];

  return [
    charts.Series<OrdinalSales, String>(
      id: 'Sales',
      colorFn: (_, __) => charts.MaterialPalette.blue.shadeDefault,
      domainFn: (OrdinalSales sales, _) => sales.year,
      measureFn: (OrdinalSales sales, _) => sales.sales,
      data: data,
    )
  ];
}

/// Sample time series data type.
class TimeSeriesSales {
  final DateTime time;
  final int sales;

  TimeSeriesSales(this.time, this.sales);
}

/// Create one series with sample hard coded data.
List<charts.Series<TimeSeriesSales, DateTime>> timeSeries_demoData() {
  final data = [
    TimeSeriesSales(DateTime(2017, 9, 19), 5),
    TimeSeriesSales(DateTime(2017, 9, 26), 25),
    TimeSeriesSales(DateTime(2017, 10, 3), 100),
    TimeSeriesSales(DateTime(2017, 10, 10), 75),
  ];

  return [
    charts.Series<TimeSeriesSales, DateTime>(
      id: 'Sales',
      colorFn: (_, __) => charts.MaterialPalette.blue.shadeDefault,
      domainFn: (TimeSeriesSales sales, _) => sales.time,
      measureFn: (TimeSeriesSales sales, _) => sales.sales,
      data: data,
    )
  ];
}

/// Sample linear data type.
class LinearSales {
  final int year;
  final int sales;
  final double radius;

  LinearSales(this.year, this.sales, this.radius);
}

/// Create one series with sample hard coded data.
List<charts.Series<LinearSales, int>> sampleScatter_demoData() {
  final data = [
    LinearSales(0, 5, 3.0),
    LinearSales(10, 25, 5.0),
    LinearSales(12, 75, 4.0),
    LinearSales(13, 225, 5.0),
    LinearSales(16, 50, 4.0),
    LinearSales(24, 75, 3.0),
    LinearSales(25, 100, 3.0),
    LinearSales(34, 150, 5.0),
    LinearSales(37, 10, 4.5),
    LinearSales(45, 300, 8.0),
    LinearSales(52, 15, 4.0),
    LinearSales(56, 200, 7.0),
  ];

  const maxMeasure = 300;

  return [
    charts.Series<LinearSales, int>(
      id: 'Sales',
      colorFn: (LinearSales sales, _) {
        final bucket = sales.sales / maxMeasure;

        if (bucket < 1 / 3) {
          return charts.MaterialPalette.blue.shadeDefault;
        } else if (bucket < 2 / 3) {
          return charts.MaterialPalette.red.shadeDefault;
        } else {
          return charts.MaterialPalette.green.shadeDefault;
        }
      },
      domainFn: (LinearSales sales, _) => sales.year,
      measureFn: (LinearSales sales, _) => sales.sales,
      // Providing a radius function is optional.
      radiusPxFn: (LinearSales sales, _) => sales.radius,
      data: data,
    )
  ];
}

class LinearSales_pie {
  final int year;
  final int sales;

  LinearSales_pie(this.year, this.sales);
}

List<charts.Series<LinearSales_pie, int>> simpleScatter_demoData() {
  final data = [
    LinearSales_pie(0, 100),
    LinearSales_pie(1, 75),
    LinearSales_pie(2, 25),
    LinearSales_pie(3, 5),
  ];

  return [
    charts.Series<LinearSales_pie, int>(
      id: 'Sales',
      domainFn: (LinearSales_pie sales, _) => sales.year,
      measureFn: (LinearSales_pie sales, _) => sales.sales,
      data: data,
    )
  ];
}
