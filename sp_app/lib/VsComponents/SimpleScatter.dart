import 'package:charts_flutter/flutter.dart' as charts;
import 'package:flutter/material.dart';
import 'package:sp_app/VsComponents/store.dart';

class SimpleScatterPlotChart extends StatelessWidget {
  final List<charts.Series> seriesList;
  final bool animate;

  SimpleScatterPlotChart(this.seriesList, {required this.animate});

  /// Creates a [ScatterPlotChart] with sample data and no transition.
  factory SimpleScatterPlotChart.withSampleData() {
    return SimpleScatterPlotChart(
      sampleScatter_demoData(),
      animate: false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return new charts.ScatterPlotChart(seriesList as dynamic, animate: animate);
  }
}
