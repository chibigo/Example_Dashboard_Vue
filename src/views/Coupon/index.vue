<script setup>
import { onMounted, ref, watch } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Textarea from "primevue/textarea";
import InputNumber from "primevue/inputnumber";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useCouponStore } from "@/stores/coupon";
import Tag from "primevue/tag";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { convertMoney, formatDate, formatDateV2 } from "@/utils";
import { Status } from "@/utils/typeAction";

const useCoupon = useCouponStore();

const visible = ref(false);

const selectedType = ref();
const types = ref([
  { name: "Reduce invoice percentage", code: "PERCENTAGE_OF_INVOICES" },
  { name: "Reduce bills", code: "MONEY" },
]);

const selectedStatus = ref();
const status = ref([
  { name: "ALL", code: undefined },
  { name: Status.ACTIVATED, code: Status.ACTIVATED },
  { name: Status.PAUSE, code: Status.PAUSE },
  { name: Status.STOP, code: Status.STOP },
  { name: Status.WRITE, code: Status.WRITE },
]);

const dates = ref();

const dateSearch = ref();
const textSearch = ref("");

const dataCreateCoupon = ref({
  couponId: null,
  couponName: "",
  description: "",
  totalInvoice: 0,
  reducedValue: 0,
  typeCoupon: "",
  startDate: 0,
  endDate: 0,
});

onMounted(() => {
  useCoupon.getListCouponAction();
});

watch(visible, (value) => {
  if (!value) {
    dataCreateCoupon.value = {
      couponId: null,
      couponName: "",
      description: "",
      totalInvoice: 0,
      reducedValue: 0,
      typeCoupon: "",
      startDate: 0,
      endDate: 0,
    };
    selectedType.value = null;
    dates.value = null;
  }
});

const handleCreateCoupon = async () => {
  dataCreateCoupon.value.typeCoupon = selectedType.value.code;
  dataCreateCoupon.value.startDate = new Date(dates.value[0]).getTime();
  dataCreateCoupon.value.endDate = new Date(dates.value[1]).getTime();
  const res = await useCoupon.createCouponAction(dataCreateCoupon.value);
  if (res) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: res.message,
      showConfirmButton: false,
      timer: 1500,
    });
    visible.value = false;
  } else {
    Swal.fire({
      title: "Error!",
      text: "Error!",
      icon: "error",
    });
  }
};

const handleChangeStatus = async (couponId, type) => {
  const res = await useCoupon.changeStatusCouponAction(type, couponId);
  if (res) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Success",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      title: "Error!",
      text: "Error!",
      icon: "error",
    });
  }
};

const handleUpdateCoupon = (data) => {
  dataCreateCoupon.value = data;
  dates.value = [new Date(data.startDate), new Date(data.endDate)];
  selectedType.value = {
    code: dataCreateCoupon.value.typeCoupon,
    name:
      dataCreateCoupon.value.typeCoupon === "MONEY"
        ? "Reduce bills"
        : "Reduce invoice percentage",
  };
  visible.value = true;
};

const handleSearch = async () => {
  await useCoupon.getListCouponAction({
    type: selectedType.value ? selectedType.value.code : undefined,
    startDate: dateSearch.value
      ? formatDateV2(dateSearch.value[0]) + " 00:00:00"
      : undefined,
    endDate: dateSearch.value
      ? formatDateV2(dateSearch.value[1]) + " 23:59:59"
      : undefined,
    couponName: textSearch.value ? textSearch.value : undefined,
    status: selectedStatus.value ? selectedStatus.value.code : undefined,
  });
};
</script>

<template>
  <div>
    <div class="coupon-main">
      <h3>Coupon Manager</h3>
      <div class="flex justify-content-end">
        <Button
          @click="visible = true"
          label="Add Coupon"
          severity="success"
          raised
        />
      </div>
      <div class="search-coupon mb-4 mt-2">
        <div>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="textSearch" placeholder="Search" />
          </span>
        </div>
        <div>
          <Dropdown
            v-model="selectedType"
            :options="types"
            optionLabel="name"
            placeholder="Select type"
            class="w-full md:w-14rem"
          />
        </div>
        <div>
          <Dropdown
            v-model="selectedStatus"
            :options="status"
            optionLabel="name"
            placeholder="Select status"
            class="w-full md:w-14rem"
          />
        </div>
        <div>
          <Calendar
            v-model="dateSearch"
            :showIcon="true"
            placeholder="Select Time"
            selectionMode="range"
            :manualInput="false"
          />
        </div>
        <div>
          <Button
            @click="handleSearch"
            label="Search"
            severity="success"
            raised
          />
        </div>
      </div>
      <div class="mt-3">
        <DataTable :value="useCoupon.listCoupon" tableStyle="min-width: 50rem">
          <Column field="index" header="#">
            <template #body="slotProps">
              {{ slotProps.index + 1 }}
            </template>
          </Column>
          <Column header="Action">
            <template #body="slotProps">
              <div>
                <Button
                  @click="
                    handleChangeStatus(
                      slotProps.data.couponId,
                      Status.ACTIVATED,
                    )
                  "
                  v-if="
                    slotProps.data.status === Status.WRITE ||
                    slotProps.data.status === Status.PAUSE
                  "
                  icon="pi pi-play"
                  severity="success"
                  text
                  rounded
                  aria-label="Search"
                />
                <Button
                  @click="
                    handleChangeStatus(slotProps.data.couponId, Status.PAUSE)
                  "
                  v-if="slotProps.data.status === Status.ACTIVATED"
                  icon="pi pi-pause"
                  severity="warning"
                  text
                  rounded
                  aria-label="Search"
                />
                <Button
                  @click="
                    handleChangeStatus(slotProps.data.couponId, Status.STOP)
                  "
                  v-if="slotProps.data.status === Status.ACTIVATED"
                  icon="pi pi-stop"
                  severity="danger"
                  text
                  rounded
                  aria-label="Search"
                />
                <Button
                  @click="handleUpdateCoupon(slotProps.data)"
                  v-if="slotProps.data.status === Status.WRITE"
                  icon="pi pi-pencil"
                  severity="help"
                  text
                  rounded
                  aria-label="Search"
                />
                <Button icon="pi pi-eye" text rounded aria-label="Search" />
              </div>
            </template>
          </Column>
          <Column field="couponId" header="Id"></Column>
          <Column field="couponName" header="Name"></Column>
          <Column field="status" header="Status">
            <template #body="slotProps">
              <Tag
                :severity="
                  slotProps.data.status === Status.WRITE
                    ? 'warning'
                    : slotProps.data.status === Status.STOP
                    ? 'danger'
                    : slotProps.data.status === Status.PAUSE
                    ? 'info'
                    : 'success'
                "
                :value="slotProps.data.status"
              ></Tag>
            </template>
          </Column>
          <Column field="typeCoupon" header="Type"></Column>
          <Column field="totalInvoice" header="Invoice">
            <template #body="slotProps">
              {{ convertMoney(slotProps.data.totalInvoice) }}
            </template>
          </Column>
          <Column field="reducedValue" header="Reduced">
            <template #body="slotProps">
              {{
                convertMoney(slotProps.data.reducedValue) +
                (slotProps.data.typeCoupon === "MONEY" ? "$" : "%")
              }}
            </template>
          </Column>
          <Column field="startDate" header="Start Date">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.startDate) }}
            </template>
          </Column>
          <Column field="endDate" header="End Date">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.endDate) }}
            </template>
          </Column>
          <Column field="createDate" header="Create Date">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.createDate) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <Dialog
      v-model:visible="visible"
      modal
      header="Add Coupon"
      :style="{ width: '60vw' }"
    >
      <div class="coupon-modal">
        <div class="flex flex-column gap-2">
          <label for="username">Coupon Name</label>
          <InputText
            id="username"
            v-model="dataCreateCoupon.couponName"
            aria-describedby="username-help"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="username">Coupon type</label>
          <Dropdown
            id="username"
            v-model="selectedType"
            :options="types"
            optionLabel="name"
            placeholder="Select coupon type"
            class="w-full"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="username">Invoice</label>
          <InputNumber
            :disabled="!selectedType"
            id="username"
            v-model="dataCreateCoupon.totalInvoice"
            aria-describedby="username-help"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="username">Reduced value</label>
          <span class="p-input-icon-right">
            <i
              class="pi"
              :class="
                !selectedType
                  ? ''
                  : selectedType?.code === 'PERCENTAGE_OF_INVOICES'
                  ? 'pi-percentage'
                  : 'pi-dollar'
              "
            />
            <InputNumber
              :disabled="!selectedType"
              class="w-full"
              id="username"
              v-model="dataCreateCoupon.reducedValue"
              aria-describedby="username-help"
            />
          </span>
        </div>
        <div class="flex flex-column gap-2">
          <label for="username">Time application</label>
          <Calendar
            placeholder="Time"
            id="username"
            v-model="dates"
            selectionMode="range"
            :manualInput="false"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="username">Description</label>
          <Textarea
            class="w-full"
            auto-resize
            rows="5"
            v-model="dataCreateCoupon.description"
          />
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="visible = false"
          text
        />
        <Button
          label="Save"
          severity="success"
          icon="pi pi-check"
          @click="handleCreateCoupon"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.coupon-main {
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 8px;

  .search-coupon {
    display: flex;

    div {
      margin-left: 5px;
    }
  }
}

.coupon-modal {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
</style>
