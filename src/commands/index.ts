import ping from './Ping';
import DiscordCommander from '../DiscordCommander';
import NestedCommand from '../interfaces/NestedCommand';
import echo from '../modes/Echo';
import RoleChecker from '../checkers/messageCheckers/roleChecker';

const roleCh: RoleChecker = new RoleChecker("roleChecker", "for checking groupman", "group-manager"); 

const commander: DiscordCommander = new DiscordCommander();
const nested: NestedCommand = new NestedCommand('nested', 'description');
const nested2: NestedCommand = new NestedCommand('nested', 'description');

nested2.addCommand(ping);

nested.addCommand(nested2);
nested.addCommand(ping);
nested.addChecker(roleCh);

commander.addCommand(ping);
commander.addCommand(echo);
commander.addCommand(nested);

export default commander;
