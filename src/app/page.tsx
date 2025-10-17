import DataTable from '@/components/DataTable/DataTable';
import ActionButtons from '@/components/ActionButtons';
  import SearchBar from '@/components/SearchBar';
import { Box, Typography, Divider } from '@mui/material';
import ImportCSVModal from '@/components/Modals/ImportCSVModal';
import ManageColumnsModal from '@/components/Modals/ManageColumnsModal';
import ConfirmDialog from '@/components/Modals/ConfirmDialog';

export default function Home() {
  return (
    <Box sx={{ maxWidth: 'lg', margin: '0 auto', p: 0 }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Data Grid Management
      </Typography>

      {/* Toolbar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
        <SearchBar />
        <ActionButtons />
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Main Table */}
      <DataTable />

      {/* Modals */}
      <ImportCSVModal />
      <ManageColumnsModal />
      <ConfirmDialog />
    </Box>
  );
}