import Command from './interfaces/Command';
import Mode from './interfaces/Mode';
import Interpreter from './interfaces/Interpreter';
import CommandData from './interfaces/CommandData';
import MessageChecker from './interfaces/MessageChecker';

class DiscordCommander {
	commands: Map<string, Command> = new Map();
	modes: Map<string, Mode> = new Map();
	interpreters: Interpreter[] = [];
	messageCheckers: MessageChecker[] = [];
	state: any = {};
	message(message: any) {
		console.log('checker');
		if (!this.check(message)) return;
		console.log('command');
		this.rawCommand(message);
		console.log('mode');
		this.rawMode(message);
		console.log('interpreter');
		this.rawInterpreter(message);
	}
	command(message: any) {
		this.check(message);
		this.rawCommand(message);
	}
	mode(message: any) {
		this.check(message);
		this.rawMode(message);
	}
	interpreter(message: any) {
		this.check(message);
		this.rawInterpreter(message);
	}
	check(message: any): boolean {
		return !this.messageCheckers.find((checker) => {
			console.log('checker: ' + 'name: ' + checker.name + 'bool: ' + checker.predicate(message));
			return !checker.predicate(message);
		});
	}
	rawCommand(message: any) {
		if (this.isCommand(message.content)) {
			const commandData: CommandData = this.commandParser(message.content);
			if (this.commands.get(commandData.name)) {
				const command: Command = this.commands.get(commandData.name);
				command.execute(message, this, commandData);
				if (command.exclusive) return;
			}
		}
	}
	rawMode(message: any) {
		this.modes.forEach((value) => {
			console.log(value.on);
			if (value.on) value.execute(message, this);
		});
	}
	rawInterpreter(message: any) {
		this.interpreters.map((value) => {
			if (value.predicate(message)) {
				value.execute(message, this);
			}
		});
	}
	addCommand(command: Command) {
		this.commands.set(command.name, command);
		if (command.altName) this.commands.set(command.altName, command);
	}
	addMode(mode: Mode) {
		this.modes.set(mode.name, mode);
	}
	addInterpreter(interpreter: Interpreter) {
		this.interpreters.push(interpreter);
	}
	addChecker(checker: MessageChecker) {
		this.messageCheckers.push(checker);
	}
	commandParser(content: string): CommandData {
		let args = content.substring(1).split(' ');
		const name = args[0];
		args = args.splice(1);
		return {
			name,
			args,
		};
	}
	isCommand(content: string): boolean {
		return content.substring(0, 1) == '!';
	}
}
export default DiscordCommander;
