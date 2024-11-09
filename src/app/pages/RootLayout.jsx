import { Navbar } from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import { SearchProvider } from "../SearchContext";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <Navbar />
        <div className="bg-gray-50 min-h-dvh">
          <Outlet />
        </div>
      </SearchProvider>
    </QueryClientProvider>
  );
};

export { RootLayout };
