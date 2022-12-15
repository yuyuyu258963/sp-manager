import 'package:flutter/material.dart';

import '../Http/api.dart';
import 'manager_card.dart';

class ManagerView extends StatefulWidget {
  ManagerView({super.key});

  @override
  State<ManagerView> createState() => _ManagerViewState();
}

class _ManagerViewState extends State<ManagerView> {
  _ManagerViewState();
  List? managers = [];

  @override
  void initState() {
    super.initState();
    getManagers();
  }

  @override
  void dispose() {
    super.dispose();
  }

  Future<void> getManagers() async {
    var data = await get("http://localhost:8081/managerList?limit=20&page=5");
    if (data != null && data.length > 0) {
      setState(() {
        managers = data;
      });
    } else {
      print("no data");
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: !managers!.isNotEmpty
          ? []
          : managers!
              .map((item) => Card(
                  shadowColor: Colors.grey,
                  elevation: 2.5,
                  child: ManagerCard(
                    age: item["age"],
                    name: item["name"],
                    Intro: item["Intro"],
                    photo: item["photo"],
                  )))
              .toList(),
    );
  }
}
