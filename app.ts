import "./framework/CommandBus";
import "./framework/EventBus";
import Server from "./framework/server";
import "./framework/store";

import * as config from "./config";

new Server().init(config);
