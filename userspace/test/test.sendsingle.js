var _sendobj = {
  //to: 'andrija.hers@gmail.com', //ok
  //to: 'andrija@grodat.com', //not verified
  //to: 'bounce@simulator.amazonses.com', //bounce
  //to: 'ooto@simulator.amazonses.com', //out of the office
  to: 'complaint@simulator.amazonses.com', //complaint
  subject: 'Test',
  body: {
    text: 'Just a plain test',
    html: '<p><span>Just an</span> <i>HTML</i> test</p>'
  }
};

function sendNotBeforeIt (sinkname, waitms) {
  waitms = waitms || 0;
  it('Send single mail in '+waitms+' milliseconds', function () {
    var sink = getGlobal(sinkname);
    var targettime = Date.now()+waitms,
      targetdate = new Date(targettime),
      body = {
        text: _sendobj.body.text+' not before '+targetdate,
        html: _sendobj.body.html+' <p style="color:red;">not before '+targetdate+'</p>'
      };
    //console.log('targetdate', targetdate);
    //console.log('body', body);
    return qlib.promise2console(sink.call('sendSingleMessage', _sendobj.to, _sendobj.subject, body, targettime));
  });
}

describe('Test Sending Single Mail', function () {
  loadMochaIntegration('allex_masterservice');
  it('Connect to Sender', function () {
    return setGlobal('Sender', findSink('Sender', { name: 'user', role: 'user' }));
  });
  /*
  it('Send single mail in 5 mins', function () {
    return qlib.promise2console(Sender.call('sendSingleMail', _sendobj.to, _sendobj.subject, _sendobj.body, Date.now()+5*lib.intervals.Minute));
  });
  */
  sendNotBeforeIt('Sender'); //, 1*lib.intervals.Second);
  it('Destroy Sender', function () {
    Sender.destroy();
  });
});
