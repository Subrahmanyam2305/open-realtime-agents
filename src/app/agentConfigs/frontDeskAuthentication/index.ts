import authenticationAgent from './authentication';
import bankAgent from "./bankAgent";
import { injectTransferTools } from '../utils';

authenticationAgent.downstreamAgents = [bankAgent]
bankAgent.downstreamAgents = [authenticationAgent]

const agents = injectTransferTools([authenticationAgent, bankAgent]);

export default agents;