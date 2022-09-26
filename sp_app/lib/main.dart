import 'package:flutter/material.dart';

import 'ManagerView/manager_view.dart';
import 'VsComponents/SimpleBar.dart';
import 'VsComponents/SimpleDonutPie.dart';
import 'VsComponents/SimpleScatter.dart';
import 'VsComponents/timeSeries.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: '基金经理信息!'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  void showOuterDialog() {
    showDialog(
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text("我是 Dialog"),
            content: SingleChildScrollView(
              child: ListBody(
                children: <Widget>[
                  Text("Content 1"),
                  Text("Content 2"),
                  Text("Content 3"),
                ],
              ),
            ),
            actions: <Widget>[
              OutlinedButton(
                child: Text("ok"),
                onPressed: () {
                  Navigator.pop(context);
                },
              )
            ],
          );
        },
        context: context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Container(
          width: 600,
          height: 700,
          padding: EdgeInsets.all(8),
          child: ManagerView(),
          // child: DonutPieChart.withSampleData(),
          // child: SimpleBarChart(
          //   SimpleBarChart.createSampleData(),
          //   animate: true,
          // ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: showOuterDialog,
        child: const Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
