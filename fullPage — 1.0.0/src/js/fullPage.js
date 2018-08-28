export default class FullPage {
  constructor(config) {
    this.class = config.class;

    this.console(this.class);
  }

  console(BlaBla) {
    console.log(BlaBla);
    let aaa = $('.' + BlaBla);

    aaa.attr('data-g', '666');
  }
}
