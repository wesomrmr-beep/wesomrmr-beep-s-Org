import { useEffect, useState } from 'react';
import {
  AccountRole,
  AppStage,
  OrderStatus,
  RegisteredUser,
  ServiceOrder,
} from './types/sunna';
import {
  DEFAULT_USER,
  INITIAL_CRAFTSMEN,
  INITIAL_ORDERS,
} from './data/mockData';
import { OnboardingFlow } from './components/OnboardingFlow';
import { ClientWorkspace } from './components/ClientWorkspace';
import { CraftsmanWorkspace } from './components/CraftsmanWorkspace';
import { GooglePlayKitPage, LegalPage } from './components/LegalAndPublishingPages';

const STORAGE_USER_KEY = 'sunna_app_user_v1';
const STORAGE_ORDERS_KEY = 'sunna_app_orders_v1';
const STORAGE_STAGE_KEY = 'sunna_app_stage_v1';

export default function App() {
  const [user, setUser] = useState<RegisteredUser>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USER_KEY);
      if (saved) return JSON.parse(saved) as RegisteredUser;
    } catch {
      // Ignore storage read errors
    }
    return DEFAULT_USER;
  });

  const [orders, setOrders] = useState<ServiceOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ORDERS_KEY);
      if (saved) return JSON.parse(saved) as ServiceOrder[];
    } catch {
      // Ignore storage read errors
    }
    return INITIAL_ORDERS;
  });

  const [stage, setStage] = useState<AppStage>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#privacy-policy') {
      return AppStage.LEGAL;
    }
    try {
      const savedStage = localStorage.getItem(STORAGE_STAGE_KEY);
      if (savedStage === AppStage.APP) {
        return AppStage.APP;
      }
    } catch {
      // Ignore
    }
    return AppStage.SPLASH;
  });

  const [previousStage, setPreviousStage] = useState<AppStage>(AppStage.SPLASH);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
    } catch {
      // Ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
    } catch {
      // Ignore
    }
  }, [orders]);

  useEffect(() => {
    if (stage === AppStage.APP || stage === AppStage.SPLASH) {
      try {
        localStorage.setItem(STORAGE_STAGE_KEY, stage);
      } catch {
        // Ignore
      }
    }
  }, [stage]);

  const navigateToSubPage = (target: AppStage.LEGAL | AppStage.PLAY_ASSETS) => {
    setPreviousStage(stage);
    setStage(target);
  };

  const handleBackFromSubPage = () => {
    if (previousStage === AppStage.LEGAL || previousStage === AppStage.PLAY_ASSETS) {
      setStage(AppStage.SPLASH);
    } else {
      setStage(previousStage);
    }
  };

  const handleCompleteRegistration = (registered: RegisteredUser) => {
    setUser(registered);
    setStage(AppStage.APP);
  };

  const handleQuickEnterDemo = (role: AccountRole) => {
    setUser((prev) => ({ ...prev, role, agreedToTerms: true }));
    setStage(AppStage.APP);
  };

  const handleCreateOrder = (newOrder: ServiceOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  if (stage === AppStage.LEGAL) {
    return <LegalPage onBack={handleBackFromSubPage} />;
  }

  if (stage === AppStage.PLAY_ASSETS) {
    return <GooglePlayKitPage onBack={handleBackFromSubPage} />;
  }

  if (
    stage === AppStage.SPLASH ||
    stage === AppStage.ROLE_SELECT ||
    stage === AppStage.REGISTER
  ) {
    return (
      <OnboardingFlow
        step={stage}
        initialUser={user}
        onChangeStep={(next) => {
          if (next === 'splash') setStage(AppStage.SPLASH);
          else if (next === 'role-select') setStage(AppStage.ROLE_SELECT);
          else setStage(AppStage.REGISTER);
        }}
        onCompleteRegistration={handleCompleteRegistration}
        onQuickEnterDemo={handleQuickEnterDemo}
        onOpenLegal={() => navigateToSubPage(AppStage.LEGAL)}
        onOpenPlayAssets={() => navigateToSubPage(AppStage.PLAY_ASSETS)}
      />
    );
  }

  if (user.role === AccountRole.CRAFTSMAN) {
    return (
      <CraftsmanWorkspace
        user={user}
        orders={orders}
        onUpdateUser={setUser}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onSwitchToClient={() =>
          setUser((prev) => ({ ...prev, role: AccountRole.CLIENT }))
        }
        onOpenLegal={() => navigateToSubPage(AppStage.LEGAL)}
        onOpenPlayAssets={() => navigateToSubPage(AppStage.PLAY_ASSETS)}
      />
    );
  }

  return (
    <ClientWorkspace
      user={user}
      craftsmen={INITIAL_CRAFTSMEN}
      orders={orders}
      onUpdateUser={setUser}
      onCreateOrder={handleCreateOrder}
      onSwitchToCraftsman={() =>
        setUser((prev) => ({ ...prev, role: AccountRole.CRAFTSMAN }))
      }
      onOpenLegal={() => navigateToSubPage(AppStage.LEGAL)}
      onOpenPlayAssets={() => navigateToSubPage(AppStage.PLAY_ASSETS)}
      onResetOnboarding={() => setStage(AppStage.SPLASH)}
    />
  );
}
