describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () { 
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should not add an empty string on submitServerInfo()', function () {
    serverNameInput.value = '';
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(0);
  });

  it('should update the server table on updateServerTable()', function(){
    submitServerInfo();
    updateServerTable();

    let newServerTable = document.querySelectorAll('#serverTable tbody tr td');

    expect(newServerTable.length).toEqual(3);
    expect(newServerTable[0].innerText).toEqual('Alice');
    expect(newServerTable[1].innerText).toEqual('$0.00');
    expect(newServerTable[2].innerText).toEqual('X');
  })

  afterEach(function() {
    serverId = 0;
    allServers = {};
    serverTbody.innerHTML = '';
  });
});

