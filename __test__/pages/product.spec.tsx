import ProductPage from "@/pages/product";
import { render } from "@testing-library/react";

jest.mock("next/router", () => {
    return {
        useRouter() {
            return { 
                route: "/product",
                pathname: "",
                query: "",
                asPath: "",
                push: jest.fn(),
                event: {
                    on: jest.fn(),
                    off: jest.fn()
                },
                beforePopState: jest.fn(() => null),
                prefetch: jest.fn(() => null),
                isReady: true
            }
        },
    }
});

describe("Product Page", () => {
    it("render product page", () => {
        const page = render(<ProductPage />);
        expect(page).toMatchSnapshot();
    });
})