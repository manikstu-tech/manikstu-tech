@props(['headers' => [], 'pagination' => null])

<div class="admin-table-wrap">
    <div class="admin-table">
        <table>
            <thead>
                <tr>
                    @foreach($headers as $header)
                        <th>{{ $header }}</th>
                    @endforeach
                </tr>
            </thead>
            <tbody>
                @forelse($slot as $row)
                    {{ $row }}
                @empty
                    <tr>
                        <td colspan="{{ count($headers) }}" class="empty-cell">
                            <x-admin.empty-state />
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
    @if($pagination)
        <div class="table-pagination">
            {{ $pagination->links() }}
        </div>
    @endif
</div>

<style>
.admin-table-wrap { background: #fff; border: 1px solid #E5E5E5; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(26,26,26,0.04); }
.admin-table { overflow-x: auto; }
.admin-table table { width: 100%; border-collapse: collapse; }
.admin-table th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #5A5A5A; background: #FAFAFA; border-bottom: 1px solid #E5E5E5; white-space: nowrap; }
.admin-table td { padding: 12px 16px; font-size: 13.5px; color: #1A1A1A; border-bottom: 1px solid #F0F0F0; }
.admin-table tbody tr:hover { background: #FAFAFA; }
.admin-table tbody tr:last-child td { border-bottom: none; }
.table-cell-img { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; border: 1px solid #E5E5E5; }
.table-cell-img-placeholder { width: 40px; height: 40px; border-radius: 8px; background: #F5F5F5; border: 1px solid #E5E5E5; display: flex; align-items: center; justify-content: center; color: #999; }
.table-actions { display: flex; align-items: center; gap: 6px; }
.table-actions a, .table-actions button { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid #E5E5E5; background: #fff; color: #5A5A5A; cursor: pointer; transition: all 0.15s; }
.table-actions a:hover, .table-actions button:hover { background: #F5F5F5; color: #1A1A1A; }
.table-actions .btn-delete:hover { background: rgba(212,52,44,0.06); color: #D4342C; border-color: rgba(212,52,44,0.2); }
.table-actions svg { width: 16px; height: 16px; }
.table-pagination { padding: 16px; display: flex; justify-content: center; }
.table-pagination .pagination { display: flex; gap: 4px; }
.table-pagination .pagination a, .table-pagination .pagination span { display: inline-flex; align-items: center; justify-content: center; min-width: 36px; height: 36px; padding: 0 10px; border-radius: 8px; font-size: 13px; font-weight: 500; border: 1px solid #E5E5E5; color: #5A5A5A; background: #fff; text-decoration: none; transition: all 0.15s; }
.table-pagination .pagination a:hover { background: #F5F5F5; color: #1A1A1A; }
.table-pagination .pagination .active a { background: #4A8C3F; color: #fff; border-color: #4A8C3F; }
.empty-cell { text-align: center; padding: 40px 16px !important; }
</style>
