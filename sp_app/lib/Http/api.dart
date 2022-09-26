import 'dart:convert';
import 'package:http/http.dart' as http;

Future<List?> get(String urlStr) async {
  var url = Uri.parse(urlStr);
  var response = await http.get(url);
  if (response.statusCode == 200) {
    List data = jsonDecode(response.body)["managers"];
    return data;
  } else {
    print(response.statusCode);
  }

  return [];
}
