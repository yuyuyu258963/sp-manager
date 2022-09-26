import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

/// 可折叠文本
///
/// ``text`` 文本内容
///
/// ``double`` 容器宽度
///
/// ``textColor`` 文字颜色
///
/// ``tagTextColor`` 标签文字的颜色
class MRichText extends StatefulWidget {
  String text;
  Color textColor;
  Color? tagTextColor;

  MRichText({
    Key? key,
    required this.text,
    required this.textColor,
    this.tagTextColor = Colors.orange,
  }) : super(key: key);

  @override
  _RichTextState createState() => _RichTextState();
}

class _RichTextState extends State<MRichText> {
  // 记录是否展开
  bool mIsExpansion = false;

  /// 判断文字是否溢出
  bool IsExpansion(String text, width) {
    TextPainter _textPainter = TextPainter(
        maxLines: 3,
        text: TextSpan(
            text: text, style: TextStyle(fontSize: 14.0, color: Colors.black)),
        textDirection: TextDirection.ltr)
      ..layout(maxWidth: width - 180, minWidth: 50);
    return _textPainter.didExceedMaxLines;
  }

  void _isShowText() {
    setState(() {
      mIsExpansion = !mIsExpansion;
    });
  }

  Widget _RichText(String _text, width) {
    if (IsExpansion(_text, width)) {
      if (mIsExpansion) {
        return Text.rich(TextSpan(
            text: _text,
            style: TextStyle(
              color: widget.textColor,
              fontSize: 14.0,
            ),
            children: [
              TextSpan(
                  text: "收起",
                  style: TextStyle(color: widget.tagTextColor),
                  recognizer: TapGestureRecognizer()
                    ..onTap = () async {
                      _isShowText();
                    })
            ]));
      } else {
        return Stack(children: <Widget>[
          GestureDetector(
            child: Text(
              _text,
              style: TextStyle(color: Color(0xFF333333), fontSize: 14.0),
              maxLines: 3,
              textAlign: TextAlign.left,
              overflow: TextOverflow.ellipsis,
            ),
            onTap: _isShowText,
          ),
        ]);
      }
    } else {
      return Text(
        _text,
        maxLines: 3,
        style: TextStyle(
          color: widget.textColor,
        ),
        textAlign: TextAlign.left,
        overflow: TextOverflow.ellipsis,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        return _RichText(widget.text, constraints.maxWidth);
      },
    );
  }
}
