import Command from '../interfaces/Command';

const Ping: Command = {
	name: 'ping',
	description: 'Can be used to ping the bot, to see if it is online.',
	execute(msg: any): void {
		msg.reply('Pong!');
	},
};
export default Ping;
