// app/(dashboard)/tabs.tsx
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AssignTaskScreen from './assigned-tasks';
import Dashboard from './dashboard';
import MyTaskScreen from './my-tasks';

const Tab = createMaterialTopTabNavigator();

export default function DashboardTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
                tabBarIndicatorStyle: { backgroundColor: 'orange' },
                tabBarActiveTintColor: 'orange',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} />
            {/* <Tab.Screen name="Home" component={DashboardHome} /> */}
            <Tab.Screen name="My Task" component={MyTaskScreen} />
            <Tab.Screen name="Assign Task" component={AssignTaskScreen} />
        </Tab.Navigator>
    );
}
