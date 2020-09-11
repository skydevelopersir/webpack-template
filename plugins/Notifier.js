const notifier = require('node-notifier');
const path = require('path');


class Notifier {

    constructor(props) {
        this.props = props;
    }

    apply(compiler) {

        compiler.hooks.done.tap('success', (state) => {
            const time = ((state.endTime - state.startTime) / 1000).toFixed(2);

            notifier.notify({
                title: `Job Done!`,
                message: `The build was completed in ${time}s`,
                icon: path.join(__dirname, 'success.png'),
            });

        });



    }



}

module.exports = Notifier;