import Command from '../interfaces/Command';
import DiscordCommander from '../DiscordCommander';
import CommandData from '../interfaces/CommandData';

const ListMembers: Command = {
	name: 'list_members',
	description: 'Command to list members',
	execute: (message: any, commander: DiscordCommander, commandData: CommandData) => {
		message.guild.members.cache.map((x) => console.log(`name: ${x.displayName}`));
	},
};

export default ListMembers;
