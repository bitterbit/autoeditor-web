import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './Layout';
import { createConnectTransport } from "@bufbuild/connect-web";
import { TransportProvider } from "@bufbuild/connect-query";

const queryClient = new QueryClient()

function App() {

  const transport = createConnectTransport({
    // Requests will be made to <baseUrl>/<package>.<service>/method
    baseUrl: "/api",

    // By default, this transport uses the JSON format.
    // Set this option to true to use the binary format.
    useBinaryFormat: false,

    // Controls what the fetch client will do with credentials, such as
    // Cookies. The default value is "same-origin", which will not
    // transmit Cookies in cross-origin requests.
    credentials: "same-origin",

    // Interceptors apply to all calls running through this transport.
    interceptors: [],

    // By default, all requests use POST. Set this option to true to use GET
    // for side-effect free RPCs.
    // useGet: false,
  });

  return (
    <TransportProvider transport={transport}>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <Layout />
      </QueryClientProvider>
    </TransportProvider>
  )
}

export default App
