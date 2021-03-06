function browserWindowsCount(expected) {
  var count = 0;
  var e = Services.wm.getEnumerator("navigator:browser");
  while (e.hasMoreElements()) {
    if (!e.getNext().closed)
      ++count;
  }
  is(count, expected,
     "number of open browser windows according to nsIWindowMediator");
  is(JSON.parse(ss.getBrowserState()).windows.length, expected,
     "number of open browser windows according to getBrowserState");
}

function test() {
  /** Test for Bug 528776, ported by Bug 548228 **/

  waitForExplicitFinish();

  browserWindowsCount(1);

  var win = openDialog(location, "", "chrome,all,dialog=no");
  win.addEventListener("load", function loadListener() {
    win.removeEventListener("load", loadListener, false);
    browserWindowsCount(2);
    win.close();
    browserWindowsCount(1);
    finish();
  }, false);
}
