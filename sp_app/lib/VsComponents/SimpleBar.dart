/// Bar chart example
import 'package:charts_flutter/flutter.dart' as charts;
import 'package:flutter/material.dart';
import 'package:sp_app/VsComponents/store.dart';

/// 简答的柱状图
class SimpleBarChart extends StatelessWidget {
  final List<charts.Series<OrdinalSales, String>> seriesList;
  final bool animate;

  const SimpleBarChart(this.seriesList, {required this.animate});

  factory SimpleBarChart.withSampleData() {
    return SimpleBarChart(
      createSampleData(),
      animate: false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return charts.BarChart(
      seriesList,
      animate: animate,
    );
  }

  /// Create one series with sample hard coded data.
  static List<charts.Series<OrdinalSales, String>> createSampleData() =>
      BarChartData_demo();
}