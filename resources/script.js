var url, prefix,connectionType;
initialize()
run()


function initialize(){
  url = $( "#url" ).val();
  prefix = $( "#prefix" ).val();
  connectionType = "ws"
  if ($('#isSecure').is(":checked")){
    connectionType = "wss"
  }

  $( "#url,#app,#prefix, #isSecure" ).change(function() {
    url = $( "#url" ).val();
    prefix = $( "#prefix" ).val();
    connectionType = "ws"
    if ($('#isSecure').is(":checked")){
      connectionType = "wss"
    }
    run();
  });
}

function run(){
  $("#chart1").empty();
  console.log("Connecting to "+connectionType+":"+url+"/"+prefix)
  $.get('https://unpkg.com/enigma.js@2.2.0/schemas/12.34.11.json')
    .then(schema => {
      const session = enigma.create({
        schema,
        url: connectionType+'://'+url+'/'+prefix+'/',
        createSocket: url => new WebSocket(url)
      });
      session.open()
        .then(global => {
          console.log(global)
          return global.getDocList()
        })
        .then(apps => {
          console.log(apps)
          listDocs(apps)
    })
  })
}

function listDocs(data)
{
  var tableText = "<table>"
  tableText += "<tr>"
  tableText+="<th>ID</th>"
  tableText+="<th>Doc name</th>"
  tableText+="<th>App title</th>"
  tableText+="<th>App size</th>"
  tableText+="<th>Last reload time</th>"
  tableText+="</tr>"
  data.forEach(function(elem){
    tableText += "<tr>"
    tableText +="<td>"+elem.qDocId+"</td>"
    tableText +="<td>"+elem.qDocName+"</td>"
    tableText +="<td>"+elem.qTitle+"</td>"
    tableText +="<td>"+elem.qFileSize+"</td>"
    tableText +="<td>"+elem.qLastReloadTime+"</td>"
    tableText += "</tr>"      
  })
  tableText += "</table>"
  $("#chart1").append(tableText);
  console.log(tableText)
}