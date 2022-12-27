import { FastifyRequest } from "fastify";

type RequestKey = (...args: any[]) => string;
type DefaultReqT = { Body: { id: string } };

function ReqKey<T extends DefaultReqT>(req: FastifyRequest<T>) {
  return req.body.id;
}

interface ISelfRouteParams {
  getUser?: RequestKey;
  key?: string;
}

export default function selfRoute({
  getUser = ReqKey,
  key = "id",
}: ISelfRouteParams = {}): (...args: any[]) => void {
  return (target: any, methodName: string, descriptor: any) => {
    const original = descriptor.value;

    // The very goal is to override the method
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async function privateMethod(...args: any[]) {
      const [req, res] = args;

      try {
        if (req.user[key] !== getUser(req)) {
          throw new Error("Unauthorized");
        }

        return original.apply(this, args);
      } catch (err) {
        res.status(401);
        return null;
      }
    };
  };
}
