import 'package:flutter/material.dart';

import "../Common/richText.dart";

class ManagerCard extends StatefulWidget {
  late String photo;
  late String age, name, Intro;
  ManagerCard(
      {super.key,
      required this.photo,
      required this.age,
      required this.Intro,
      required this.name});

  @override
  State<ManagerCard> createState() => _ManagerCard();
}

class _ManagerCard extends State<ManagerCard> {
  @override
  Widget build(
    BuildContext context,
  ) {
    return Column(children: [
      ListTile(
        leading: CircleAvatar(
          backgroundImage: NetworkImage(widget.photo),
        ),
        title: Text(widget.name),
      ),
      Divider(),
      LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
          return MRichText(
              text: widget.Intro,
              textColor: Colors.black,
              tagTextColor: Colors.red);
        },
      ),
    ]);
  }
}
