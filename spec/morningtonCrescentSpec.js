describe('#eventHandler', function() {
  it('recognises a launch request and triggers a welcome message', function() {
    spyOn(self, 'onLaunch');
    eventHandler(launchEvent(), alexaContext());
    expect(self.onLaunch).toHaveBeenCalled();
  });
  it('recognises an intent request', function() {
    spyOn(self, 'onIntent');
    eventHandler(playEvent(), alexaContext());
    expect(self.onIntent).toHaveBeenCalled();
  });
});
