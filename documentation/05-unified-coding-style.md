## **統一 IDE 編程風格**

### **支援 editor config 的 IDE 清單**

* JetBrain’s IDEs, including PhpStorm, and
* WebStorm
* BBEdit
* Atom
* Sublime Text
* GitHub
* Emacs & Vim
* Brackets
* Coda
* Eclipse & NetBeans
* gEdit, jEdit, & Notepad++
* textmate
* Visual Studio
* Xcode

### **安裝**

建立檔案 _**.editorconfig**_ 並編輯其內容如下
```
# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

# Use 4 spaces for the Python files
[*.py]
indent_size = 4
max_line_length = 80

# The JSON files contain newlines inconsistently
[*.json]
insert_final_newline = ignore

# Minified JavaScript files shouldn't be changed
[**.min.js]
indent_style = ignore
insert_final_newline = ignore

# Makefiles always use tabs for indentation
[Makefile]
indent_style = tab

# Batch files use tabs for indentation
[*.bat]
indent_style = tab

[*.md]
trim_trailing_whitespace = false
```
完成後 IDE 會自動抓取設定值中的風格設定，並忽略 IDE 的原始設定值<br>
如此一來，只需要加入一個設定檔即可在團隊中統一編程風格

[上一章](./04-nodemon-install.md) - [返回目錄](../readme.md) - [下一章](./06-express-proxy.md)